'use client';
import { Bodies, Composite, Engine, Mouse, MouseConstraint, Render, Runner } from 'matter-js';
import { useEffect, useRef } from 'react';


const MainSkill = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const imageList = [
            "/assets/image/skillImage/apache.png",
            "/assets/image/skillImage/css.png",
            "/assets/image/skillImage/git.png",
            "/assets/image/skillImage/html.png",
            "/assets/image/skillImage/java.png",
            "/assets/image/skillImage/jquery.png",
            "/assets/image/skillImage/js.png",
            "/assets/image/skillImage/linux.png",
            "/assets/image/skillImage/next.png",
            "/assets/image/skillImage/node.png",
            "/assets/image/skillImage/react.png",
            "/assets/image/skillImage/redux.png",
            "/assets/image/skillImage/tomcat.png",
            "/assets/image/skillImage/ts.png",
            "/assets/image/skillImage/webpack.png"
        ];
        const canvas = canvasRef.current;
        const cw = 3000;
        const ch = 3000;

        let engine: Engine, render: Render, runner: Runner, mouse: Mouse, mouseConstraint;

        initScreen();
        initMouse();
        initGround();
        initImageBoxes();

        function initScreen() {
            engine = Engine.create();

            render = Render.create({
                canvas: canvas,
                engine: engine,
                options: {
                    width: cw,
                    height: ch,
                    wireframes: false,
                    background: '#1b1b19'
                }
            });

            runner = Runner.create();

            Render.run(render);
            Runner.run(runner, engine);
        }

        function initMouse() {
            mouse = Mouse.create(canvas);
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse
            });
            Composite.add(engine.world, mouseConstraint);
        }

        function initGround() {
            const segments = 32;
            const deg = (Math.PI * 2) / segments;
            const width = 50;
            const radius = cw / 2 + width / 2;
            const height = radius * Math.tan(deg / 2) * 2;

            for (let i = 0; i < segments; i++) {
                const theta = deg * i;
                const x = radius * Math.cos(theta) + cw / 2;
                const y = radius * Math.sin(theta) + ch / 2;

                addRect(x, y, width, height, { isStatic: true, angle: theta });
            }
        }

        function addRect(x: number, y: number, w: number, h: number, option = {}) {
            const rect = Bodies.rectangle(x, y, w, h, option);
            Composite.add(engine.world, rect);
        }

        function initImageBoxes() {
            const scale = 0.7; // 이미지 크기 비율
            const t1 = { w: 250 * scale, h: 250 * scale };
            const radius = 400; // 원형으로 배치할 반지름 값을 더 크게 설정
            
            // 이미지들을 원형으로 배치
            imageList.forEach((imgSrc, index) => {
                const angle = (Math.PI * 2 * index) / imageList.length; // 각도를 계산
                const x = cw / 2 + Math.cos(angle) * radius; // x 좌표를 원형으로 계산
                const y = ch / 2 + Math.sin(angle) * radius; // y 좌표를 원형으로 계산
        
                // 이미지를 차례대로 추가
                addRect(x, y, t1.w, t1.h, {
                    chamfer: { radius: 20 }, // 이미지 모서리 둥글게
                    render: {
                        sprite: {
                            texture: imgSrc,
                            xScale: scale,
                            yScale: scale
                        }
                    }
                });
            });
        }
        
        
    }, []);
  return (
    <section className="bg-[#101010] flex flex-col relative text-white text-center gap-4 py-10">
      <div className="flex items-center justify-center gap-16 p-20">
        <canvas ref={canvasRef} className="w-[50vmin] h-[50vmin] rounded-full shadow-inner shadow-black/20 bg-black/5"></canvas>
        <aside className="w-[50vmin]">
          <h1 className="text-4xl mb-2">Javascript</h1>
          <h2 className="text-3xl mb-8">⭐⭐⭐⭐⭐</h2>
          <p className="text-xl leading-relaxed">
            It is a long established fact
          </p>
        </aside>
      </div>
    </section>
  );
};

export default MainSkill;
