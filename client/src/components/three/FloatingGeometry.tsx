import { useRef, useEffect } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshBasicMaterial,
  IcosahedronGeometry,
  OctahedronGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  Material,
} from 'three';

interface MeshWithAnimation extends Mesh {
  rotationSpeed: { x: number; y: number; z: number };
  floatSpeed: number;
  floatOffset: number;
}

export function FloatingGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create floating geometries
    const geometries: MeshWithAnimation[] = [];
    const shapes = [
      new IcosahedronGeometry(1, 0),
      new OctahedronGeometry(1, 0),
      new TetrahedronGeometry(1, 0),
      new TorusGeometry(0.7, 0.3, 8, 16),
      new TorusKnotGeometry(0.5, 0.2, 64, 8),
    ];

    const material = new MeshBasicMaterial({
      color: '#8b5cf6',
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    for (let i = 0; i < 15; i++) {
      const geometry = shapes[Math.floor(Math.random() * shapes.length)].clone();
      const mesh = new Mesh(geometry, material.clone()) as unknown as MeshWithAnimation;
      
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50 - 30
      );
      
      mesh.scale.setScalar(Math.random() * 3 + 1);
      
      mesh.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      };
      
      mesh.floatSpeed = Math.random() * 0.5 + 0.5;
      mesh.floatOffset = Math.random() * Math.PI * 2;
      
      geometries.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 50;

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      geometries.forEach((mesh) => {
        mesh.rotation.x += mesh.rotationSpeed.x;
        mesh.rotation.y += mesh.rotationSpeed.y;
        mesh.rotation.z += mesh.rotationSpeed.z;
        mesh.position.y += Math.sin(time * mesh.floatSpeed + mesh.floatOffset) * 0.02;
      });

      // Subtle camera movement based on mouse
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.01;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometries.forEach(mesh => {
        mesh.geometry.dispose();
        (mesh.material as Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50"
    />
  );
}
