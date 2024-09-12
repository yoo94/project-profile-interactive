import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'; // next/image 사용 시 import 추가 필요
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowBigRight, ArrowBigLeft } from 'lucide-react';

const LogoSwiper = () => {
  const images = [
    {
      src: 'logo3', title: 'MagnaChip',
      description: '그룹웨어 결재연동 API 구현  출장비 서비스 기능 구현', period: '21.08 ~ 22.01',
      ism: false
    },
    {
      src: 'logo1', title: 'hanhwa energy',
      description: 'AS-IS 기능 고도화 진행', period: '22.02 ~ 22.07',
      ism: false
    },
    {
      src: 'logo7', title: 'sk biopharm',
      description: '실비 정산 기능 구현 및 그룹웨어 결재연동 및 AD sso 인증 서비스 구현', period: '22.04 ~ 22.10',
      ism: false
    },
    {
      src: 'logo8', title: 'sk stoa',
      description: '더존 그룹웨어 결재연동 API / 출장비 정산 서비스 구현', period: '22.04 ~ 22.10',
      ism: true
    },
    {
      src: 'logo4', title: '남해화학',
      description: 'This is the third logo.', period: '22.10 ~ 23.05',
      ism: false
    },
    {
      src: 'logo6', title: 'sk signet',
      description: 'This is the third logo.', period: '23.01 ~ 23.07',
      ism: false
    },
    {
      src: 'logo9', title: 'tmap',
      description: '거래처 등록 서비스 / 출장비 정산 서비스', period: '23.06 ~ 24.02',
      ism: false
    },
    {
      src: 'logo5', title: 'sajo cpk',
      fskill: 'JavaScript', bskill: 'JavaScript',
      description: '전자결재 서비스 기능 커스터마이징', period: '24.03 ~ 24.07',
      ism: true
    },
    {
      src: 'logo2', title: 'HMM',
      fskill: 'JavaScript', bskill: 'JavaScript',
      description: '해외/국내 출장비 보고서, 정산 서비스 구현', period: '24.02 ~ 25.02',
      ism: true
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl: '.custom-next-button',
        prevEl: '.custom-prev-button',
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex w-full">
            <div className="w-1/3">
              <Image
                className='ml-72'
                src={`/assets/image/${image.src}.jpg`}
                alt={image.title}
                width={1300}
                height={400}
                style={{ width: '70%', height: 'auto', borderRadius: '70%' }}
              />
            </div>
            <div className="w-2/3 p-4">
              <h2 className="text-xl font-semibold">{image.title}</h2>
              <h4>period : {image.period}</h4>
              <p className="text-sm text-red-500">web front Skill: html, css, js, jquery, requireJs, mustache</p>
              {image.ism && (
                <p className="text-sm text-red-500">mobile Skill: react-native, react, typeScript, redux, webpack</p>
              )}
              <p className="text-sm text-blue-500">back Skill: java,spring</p>
              <h5 className='mt-6'>구현</h5>
              <p className="text-sm">{image.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <button className="custom-prev-button"><ArrowBigLeft /></button>
      <button className="custom-next-button"><ArrowBigRight /></button>
    </Swiper>
  );
};

export default LogoSwiper;
