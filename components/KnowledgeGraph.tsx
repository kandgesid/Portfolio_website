import React, { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
  skill: string;
  category: 'backend' | 'frontend' | 'ai' | 'cloud' | 'database';
}

const KnowledgeGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Knowledge graph data
    const skills = [
      // Backend
      { skill: 'Node.js', category: 'backend' as const },
      { skill: 'Python', category: 'backend' as const },
      { skill: 'Java', category: 'backend' as const },
      { skill: 'Go', category: 'backend' as const },
      { skill: 'REST APIs', category: 'backend' as const },
      { skill: 'GraphQL', category: 'backend' as const },
      { skill: 'Microservices', category: 'backend' as const },
      
      // Frontend
      { skill: 'React', category: 'frontend' as const },
      { skill: 'TypeScript', category: 'frontend' as const },
      { skill: 'JavaScript', category: 'frontend' as const },
      { skill: 'HTML/CSS', category: 'frontend' as const },
      { skill: 'Tailwind', category: 'frontend' as const },
      
      // AI/ML
      { skill: 'Machine Learning', category: 'ai' as const },
      { skill: 'Deep Learning', category: 'ai' as const },
      { skill: 'TensorFlow', category: 'ai' as const },
      { skill: 'PyTorch', category: 'ai' as const },
      { skill: 'NLP', category: 'ai' as const },
      
      // Cloud
      { skill: 'AWS', category: 'cloud' as const },
      { skill: 'Docker', category: 'cloud' as const },
      { skill: 'Kubernetes', category: 'cloud' as const },
      { skill: 'CI/CD', category: 'cloud' as const },
      { skill: 'Serverless', category: 'cloud' as const },
      
      // Database
      { skill: 'PostgreSQL', category: 'database' as const },
      { skill: 'MongoDB', category: 'database' as const },
      { skill: 'Redis', category: 'database' as const },
      { skill: 'Elasticsearch', category: 'database' as const },
    ];

    // Create nodes
    const nodes: Node[] = skills.map((item, index) => ({
      id: index,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 2,
      connections: [],
      skill: item.skill,
      category: item.category,
    }));

    // Create connections based on categories
    const createConnections = () => {
      nodes.forEach((node, i) => {
        node.connections = [];
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            // Connect nodes of same category
            if (node.category === otherNode.category) {
              if (Math.random() < 0.3) {
                node.connections.push(j);
              }
            }
            // Connect some cross-category connections
            else if (Math.random() < 0.05) {
              node.connections.push(j);
            }
          }
        });
      });
    };
    createConnections();

    // Color scheme for categories - Moon and night theme
    const colors = {
      backend: '#F4F4F5', // Moon white
      frontend: '#E4E4E7', // Light silver
      ai: '#D4D4D8', // Silver
      cloud: '#A1A1AA', // Gray
      database: '#71717A', // Dark gray
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < node.radius || node.x > canvas.width - node.radius) {
          node.vx *= -1;
        }
        if (node.y < node.radius || node.y > canvas.height - node.radius) {
          node.vy *= -1;
        }

        // Keep nodes in bounds
        node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x));
        node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y));
      });

      // Draw connections
      nodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const connectedNode = nodes[connectionId];
          const distance = Math.sqrt(
            Math.pow(node.x - connectedNode.x, 2) + Math.pow(node.y - connectedNode.y, 2)
          );

          if (distance < 150) {
            const opacity = Math.max(0, 1 - distance / 150);
            ctx.strokeStyle = `rgba(244, 244, 245, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        const color = colors[node.category];
        
        // Node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2);
        gradient.addColorStop(0, `${color}40`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node pulse effect
        const time = Date.now() * 0.001;
        const pulse = Math.sin(time + node.id) * 0.5 + 0.5;
        ctx.strokeStyle = `${color}${Math.floor(pulse * 100)}`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulse * 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'transparent',
      }}
    />
  );
};

export default KnowledgeGraph; 