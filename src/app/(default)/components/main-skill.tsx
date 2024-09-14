'use client';
import { useScroll } from 'framer-motion';
import { Bodies, Composite, Engine, Events, Mouse, MouseConstraint, Render, Runner } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
interface SkillData {
    title: string;
    level: number;
    desc: string;
    color: string;
}

interface Data {
    [key: string]: SkillData;  
}
const data: Data = {
    Javascript: {
        title: 'Javascript',
        level: 5,
        desc: 'js엔진에 대한 동작 원리와를 이해하고 있습니다. ES6문법을 이해하고 비동기 처리, 프로미스, 클로저 등을 활용 할 수 있습니다.',
        color:'yellow'
    },
    REACT: {
        title: 'React.js',
        level: 3,
        desc: '상태 관리와 생명주기 메서드에 대해 기본적인 이해하고  있고, 함수형 컴포넌트와 커스텀 hook를 사용하여 프로젝트를 진행할 수 있습니다.',
        color:'blue'
    },
    CSS: {
        title: 'CSS',
        level: 3,
        desc: 'tailwind, styled component, 미디어 쿼리를 통해 반응형 디자인을 구현할 수 있습니다. 특정 라이브러리를 이용하여 인터랙티브 ui 구현 경험이 있습니다.',
        color:'blue'
    },
    HTML: {
        title: 'HTML',
        level: 5,
        desc: '기본 퍼블리싱과 개인 프로젝트에서 SEO 최적화 경험이 있습니다.',
        color:'white'
    },
    git: {
        title: 'GIT',
        level: 4,
        desc: ' 브랜치 전략을 이해하고 협업 도구로서의 GitFlow와 같은 워크플로우를 사용하여 프로젝트 관리가 가능하며, 다양한 리베이스 및 머지 상황을 해결할 수 있습니다.',
        color:'orange'
    },
    java: {
        title: 'JAVA',
        level: 3,
        desc: 'spring 프레임워크를 사용하여 기본적인 클래스 설계와 상속, 인터페이스 등을 활용한 애플리케이션 개발 경험이 있으며, API를 만들어 타 서비스와 연동한 경험이 있습니다.',
        color:'red'
    },
    linux: {
        title: 'LINUX',
        level: 3,
        desc: '기본적인 커맨드 사용과 파일 시스템 관리, 패키지 설치 및 셸 스크립트 작성이 가능하며, 서버 운영 및 관리에 필요한 기초적인 명령어에 익숙합니다.',
        color:'yellow'
    },
    next: {
        title: 'NEXT.js',
        level: 4,
        desc: '앱 라우트 사용경험이 있으며,서버 사이드 렌더링,정적 웹 페이지 생성에 대한 이해가 있으며 그룹프로젝트에서 사용하여 배포까지의 경험이 있습니다. https://www.innerbooks.shop/',
        color:'white'
    },
    node: {
        title: 'NODE.js',
        level: 3,
        desc: 'Express 프레임워크를 사용하여 기본적인 서버구축이 가능합니다.',
        color:'green'
    },
    redux: {
        title: 'REDUX',
        level: 2,
        desc: '기본적인 스토어 설정과 리듀서, 액션, 미들웨어를 활용할 수 있으며, React와 연동하여 상태 관리를 할 수 있는 기본적인 수준의 이해가 있습니다.',
        color:'purple'
    },
    tomcat: {
        title: 'TOMCAT',
        level: 4,
        desc: '웹 애플리케이션의 배포 및 관리를 경험하였으며, 설정 파일(tomcat-users.xml, server.xml, 클러스터링 설정)을 수정하여 애플리케이션 설정을 조정할 수 있습니다.',
        color:'yellow'
    },
    typescript: {
        title: 'TypeScript',
        level: 3,
        desc: '타입 시스템을 활용하여 정적 타입을 정의하고, 인터페이스와 제네릭을 사용하여 코드의 안정성과 유지보수성을 높일 수 있습니다.',
        color:'blue'
    },
    webpack: {
        title: 'webpack',
        level: 3,
        desc: '기본적인 설정 파일 작성과 로더 및 플러그인을 사용하여 프로젝트의 빌드 과정을 최적화할 수 있습니다. 기본적인 번들링 작업과 코드 스플리팅 경험이 있습니다.',
        color:'blue'
    },
    apache: {
        title: 'Apache',
        level: 3,
        desc: '기본적인 설정 파일을 수정하여 서버를 운영할 수 있으며, 가상 호스트 설정과(vhost, worker) SSL 인증서 설치에 대한 경험이 있습니다.',
        color:'grey'
    },
    jquery: {
        title: 'jquery',
        level: 3,
        desc: '비동기 처리, 메서드 체이닝 등 제이쿼리에서 제공하는 다양한 메서드를 사용하여 개발한 경험이 있습니다.',
        color:'yellow'
    }
};
const imageList = [
    { src: "/assets/image/skillImage/css.png", label: 'CSS' },
    { src: "/assets/image/skillImage/git.png", label: 'git' },
    { src: "/assets/image/skillImage/html.png", label: 'HTML' },
    { src: "/assets/image/skillImage/java.png", label: 'java' },
    { src: "/assets/image/skillImage/jquery.png", label: 'jquery' },
    { src: "/assets/image/skillImage/js.png", label: 'Javascript' },
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
    const [selected, setSelected] = useState(data['Javascript']);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: canvasRef,
        offset: ["start end", "end start"]
      })
    useEffect(() => {
        if (!canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const cw = 2700;
        const ch = 2700;

        let engine: Engine, render: Render, runner: Runner, mouse: Mouse, mouseConstraint: MouseConstraint;

        
        const onScrollChange = (yProgress: number) => {
            console.log(yProgress)
            if (yProgress > 0.1 && yProgress < 0.2  ) {
                initScreen();
                initMouse();
                initGround();
                initImageBoxes();
            }
        }
        const unsubScriveY = scrollYProgress.on("change", onScrollChange)

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
            Events.on(mouseConstraint, 'mousedown', () => {
                if (mouseConstraint.body) {
                    const newSelected = data[mouseConstraint.body.label];
                    if (newSelected) {
                        setSelected(newSelected); // 선택된 객체의 데이터를 설정
                    }
                }
            });
        }
        function initCircularBoundary() {
            const boundaryRadius = 450; // 원형 경계의 반지름
            const boundaryThickness = 50; // 경계 벽의 두께
        
            // 원형 경계를 만들기 위한 다각형으로 구성된 벽을 추가
            const segments = 60; // 원형 경계를 이루는 다각형의 변 개수
            const angleStep = (2 * Math.PI) / segments;
        
            for (let i = 0; i < segments; i++) {
                const angle = i * angleStep;
                const x = cw / 2 + Math.cos(angle) * (boundaryRadius + boundaryThickness / 2);
                const y = ch / 2 + Math.sin(angle) * (boundaryRadius + boundaryThickness / 2);
        
                // 각 벽은 경계의 일부로, 두께가 있는 직사각형으로 구성됨
                const boundarySegment = Bodies.rectangle(
                    x,
                    y,
                    boundaryThickness, // 벽의 두께
                    boundaryThickness, // 벽의 길이 (작게 설정)
                    {
                        isStatic: true,
                        angle: angle, // 벽을 회전하여 원형으로 배치
                        render: {
                            visible: false // 경계를 보이지 않게 처리
                        }
                    }
                );
        
                Composite.add(engine.world, boundarySegment);
            }
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
        
            // 원형 경계 추가
            initCircularBoundary();
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
                        restitution: 0.8, // 반발력 설정
                        friction: 0.05,   // 마찰력 설정
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
                        restitution: 0.8, // 반발력 설정
                        friction: 0.05,   // 마찰력 설정
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
        return () => { unsubScriveY() }

    }, []);
    return (
        <section className="bg-[#101010] flex flex-col relative text-white text-center gap-4 py-10">
            <div className="flex items-center justify-center gap-16 p-20">
                <canvas ref={canvasRef} className="w-[45vmin] h-[45vmin] rounded-full shadow-inner shadow-black/20 bg-black/5"></canvas>
                <aside className="w-[50vmin]">
                <h1 className={`text-4xl mb-2 ${selected.color === 'yellow' ? 'text-yellow-300' : ''} ${selected.color === 'blue' ? 'text-blue-300' : ''} ${selected.color === 'red' ? 'text-red-300' : ''} ${selected.color === 'green' ? 'text-green-300' : ''} ${selected.color === 'purple' ? 'text-purple-300' : ''} ${selected.color === 'orange' ? 'text-orange-300' : ''} ${selected.color === 'white' ? 'text-white' : ''}`}>
  {selected.title}
</h1>                    {/* <h2 className="text-3xl mb-8">
                        {Array(5).fill(null).map((_, i) => (
                            <span key={i} style={{ filter: `grayscale(${selected.level <= i ? 1 : 0})` }}> &#11088;</span>
                        ))}
                    </h2> */}
                    <p className="text-2xl leading-relaxed mt-10">
                        {selected.desc}
                    </p>
                </aside>
            </div>
        </section >
    );
};

export default MainSkill;
