import { useRef, useEffect } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Points,
  Color,
  Vector2,
  AdditiveBlending,
} from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export function ParticleField({ 
  count = 2000, 
  color = '#8b5cf6', 
  size = 2,
  speed = 0.0003 
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const geometry = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorVariants = [
      new Color('#8b5cf6'),
      new Color('#a855f7'),
      new Color('#c084fc'),
      new Color('#6366f1'),
      new Color('#ec4899'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spread particles in a sphere
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const colorVariant = colorVariants[Math.floor(Math.random() * colorVariants.length)];
      colors[i3] = colorVariant.r;
      colors[i3 + 1] = colorVariant.g;
      colors[i3 + 2] = colorVariant.b;

      sizes[i] = Math.random() * size + 0.5;
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));

    // Custom shader material for better particles
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Gentle wave motion
          pos.x += sin(uTime * 0.5 + position.y * 0.05) * 2.0;
          pos.y += cos(uTime * 0.3 + position.x * 0.05) * 2.0;
          pos.z += sin(uTime * 0.4 + position.z * 0.05) * 1.5;
          
          // Mouse influence
          float dist = distance(pos.xy, uMouse * 50.0);
          pos.z += smoothstep(30.0, 0.0, dist) * 10.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * uPixelRatio * (200.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.6;
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const particles = new Points(geometry, material);
    scene.add(particles);

    camera.position.z = 100;

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += speed * 100;

      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Rotate the entire particle system
      particles.rotation.y = time * 0.0001;
      particles.rotation.x = Math.sin(time * 0.0002) * 0.1;

      // Camera follows mouse slightly
      camera.position.x += (mouseRef.current.x * 10 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 10 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [count, color, size, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
