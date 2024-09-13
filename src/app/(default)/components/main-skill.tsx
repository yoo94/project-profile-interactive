'use client';
import { Bodies, Composite, Engine, Events, Mouse, MouseConstraint, Render, Runner } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
interface SkillData {
    title: string;
    level: number;
    desc: string;
}

interface Data {
    JS: SkillData;
    REACT: SkillData;
    CSS: SkillData;
    HTML: SkillData;
    [key: string]: SkillData;  // This line allows indexing with any string but assumes all keys are of type SkillData
}
const data: Data = {
    JS: { title: 'Javascript', level: 5, desc: '자바스크립트에 대한 설명이라고 할 수 있습니다. 자바스크립트 ...' },
    REACT: { title: 'React.js', level: 3, desc: 'React에 대한 설명이라고 할 수 있습니다. React에 대한 ...' },
    CSS: { title: 'CSS', level: 3, desc: 'CSS에 대한 설명이라고 할 수 있습니다. CSS에 대한 설명...' },
    HTML: { title: 'HTML', level: 5, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    git: { title: 'GIT', level: 4, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    java: { title: 'JAVA', level: 3, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    jquery: { title: 'HTML', level: 4, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    linux: { title: 'LINUX', level: 3, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    next: { title: 'NEXT.js', level: 4, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    node: { title: 'NODE.js', level: 3, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    redux: { title: 'REDUX', level: 2, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    tomcat: { title: 'TOMCAT', level: 4, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    typescript: { title: 'TypeScript', level: 3, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    webpack: { title: 'webpack', level: 3, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
    apache: { title: 'Apache', level: 3, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명...' },
};
const imageList = [
    { src: "/assets/image/skillImage/css.png", label: 'CSS' },
    { src: "/assets/image/skillImage/git.png", label: 'git' },
    { src: "/assets/image/skillImage/html.png", label: 'HTML' },
    { src: "/assets/image/skillImage/java.png", label: 'java' },
    { src: "/assets/image/skillImage/jquery.png", label: 'jquery' },
    { src: "/assets/image/skillImage/js.png", label: 'js' },
    { src: "/assets/image/skillImage/linux.png", label: 'linux' },
    { src: "/assets/image/skillImage/next.png", label: 'next' },
    { src: "/assets/image/skillImage/node.png", label: 'node' },
    { src: "/assets/image/skillImage/react.png", label: 'REACT' },
    { src: "/assets/image/skillImage/redux.png", label: 'redux' },
    { src: "/assets/image/skillImage/tomcat.png", label: 'tomcat' },
    { src: "/assets/image/skillImage/ts.png", label: 'typescript' },
    { src: "/assets/image/skillImage/webpack.png", label: 'webpack' },
    { src: "/assets/image/skillImage/apache.png", label: 'apache' },
];

const MainSkill = () => {
    const [selected, setSelected] = useState(data['JS']);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const cw = 2700;
        const ch = 2700;

        const gravityPower = 0.5;
        let gravityDeg = 0;
        let engine: Engine, render: Render, runner: Runner, mouse: Mouse, mouseConstraint: MouseConstraint;

        initScreen();
        initMouse();
        initGround();
        initImageBoxes();

        Events.on(mouseConstraint, 'mousedown', () => {
            if (mouseConstraint.body) {
                const newSelected = data[mouseConstraint.body.label];
                if (newSelected) {
                    setSelected(newSelected); // 선택된 객체의 데이터를 설정
                }
            }
        });
        Events.on(runner, 'tick', () => {
            gravityDeg += 1
            engine.world.gravity = - gravityPower * Math.cos(Math.PI / 180 * gravityDeg)
            engine.world.gravity = - gravityPower * Math.sin(Math.PI / 180 * gravityDeg)
        })
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
            const radius = 250 * scale; // 원형 크기

            // 이미지들을 다양한 모양으로 배치
            imageList.forEach((imgSrc, index) => {
                const shapeType = index % 2 === 0 ? 'circle' : 'polygon'; // 짝수 인덱스는 원, 홀수는 다각형
                const x = cw / 2 + (index % 5) * 100; // 각 이미지의 초기 x 좌표
                const y = ch / 4; // 초기 y 좌표

                if (shapeType === 'circle') {
                    // 원형 모양의 물체 추가
                    const circle = Bodies.circle(x, y, radius, {
                        label: imgSrc.label,
                        render: {
                            sprite: {
                                texture: imgSrc.src,
                                xScale: scale,
                                yScale: scale
                            }
                        }
                    });
                    Composite.add(engine.world, circle);
                } else {
                    // 다각형 모양의 물체 추가
                    const sides = 6; // 다각형의 변 개수
                    const polygon = Bodies.polygon(x, y, sides, radius, {
                        label: imgSrc.label,
                        render: {
                            sprite: {
                                texture: imgSrc.src,
                                xScale: scale,
                                yScale: scale
                            }
                        }
                    });
                    Composite.add(engine.world, polygon);
                }
            });
        }

    }, []);
    return (
        <section className="bg-[#101010] flex flex-col relative text-white text-center gap-4 py-10">
            <div className="flex items-center justify-center gap-16 p-20">
                <canvas ref={canvasRef} className="w-[45vmin] h-[45vmin] rounded-full shadow-inner shadow-black/20 bg-black/5"></canvas>
                <aside className="w-[50vmin]">
                    <h1 className="text-4xl mb-2">{selected.title}</h1>
                    <h2 className="text-3xl mb-8">
                        {Array(5).fill(null).map((_, i) => (
                            <span key={i} style={{ filter: `grayscale(${selected.level <= i ? 1 : 0})` }}> &#11088;</span>
                        ))}
                    </h2>
                    <p className="text-xl leading-relaxed">
                        {selected.desc}
                    </p>
                </aside>
            </div>
        </section >
    );
};

export default MainSkill;
