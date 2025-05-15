import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

interface TamkeenServicesProps {
    lang: 'en' | 'ar';
    userAgent: any
}

const TamkeenServices: React.FC<TamkeenServicesProps> = ({ lang, userAgent }) => {
    const router = useRouter();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return (
        <div className={`my-5 xl:my-10 max-md:mb-32 max-md:mt-5 ${userAgent}`}>
            <h2 className="heading__base">
                {lang === 'ar' ? 'خدمات تمكين المميزة لك' : 'Tamkeen Special Services'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                {[
                    {
                        title: lang === 'ar' ? 'خدمات الصيانة' : 'Maintainance Service',
                        description:
                            lang === 'ar'
                                ? 'استمتع بعمر افتراضي طويل لأجهزتك من خلال خدمات الصيانة المتميزة التي نقدمها. يقوم الفنيون الماهرون لدينا بإجراء عمليات فحص ومعاينه دقيقة لضمان أعلى مستوى من الأداء.'
                                : 'Unlock Longevity for Your Appliances with Our Premium Maintenance Services. Our adept technicians conduct meticulous inspections, and calibration, ensuring peak performance.',
                        imgSrc:
                            'https://partners.tamkeenstores.com.sa/assets/new-media/5955af8279d5d71989f73fea1e0e1a091713958065.svg',
                        route: `${origin}/${lang}/maintenance`,
                    },
                    {
                        title: lang === 'ar' ? 'خدمة التقسيط' : 'Installment Services',
                        description:
                            lang === 'ar'
                                ? 'تقدم تمكين خطط تقسيط سهلة للأجهزة المنزلية. استمتع بشروط مرنة وأسعار تنافسية وموافقات سريعة مع شركاء الدفع لدينا، مما يجعل عملية الشراء مريحة وبأسعار معقولة.'
                                : 'Tamkeen offers hassle-free installment plans for home appliances. Enjoy flexible terms, competitive rates, and swift approvals with our Payment partners, making your purchase convenient and affordable.',
                        imgSrc:
                            'https://partners.tamkeenstores.com.sa/assets/new-media/1503ce4c090a865d2cf08d18198069e91713958042.svg',
                        route: `${origin}/${lang}/installment-service-methods`,
                    },
                    {
                        title: lang === 'ar' ? 'خدمة الاستبدال والاسترجاع' : 'Exchange & Return Service',
                        description:
                            lang === 'ar'
                                ? 'تضمن سياسة إرجاع واستبدال الأجهزة المنزلية لدينا رضاك. إذا لم تكن راضيًا، قم بإعادته خلال 30 يومًا واسترداد أموالك بالكامل أو استبدالها، تطبق الشروط والأحكام.'
                                : 'Our home appliance return & exchange policy ensures your satisfaction. If not delighted, return within 30 days & for a full refund or exchange, T&C apply.',
                        imgSrc:
                            'https://partners.tamkeenstores.com.sa/assets/new-media/35490fbd7c9f30b09bf693ed356203c71713958087.svg',
                        route: `${origin}/${lang}/repalcement-and-retrieval-policy`,
                    },
                    {
                        title: lang === 'ar' ? 'خدمة العملاء' : 'Customer Care',
                        description:
                            lang === 'ar'
                                ? 'نحن نعطي الأولوية لرضاك، ونقدم الدعم الشخصي للتأكد من أن أجهزتك المنزلية تلبي احتياجاتك بسلاسة. اتصل بنا اليوم للحصول على مساعدة لا مثيل لها.'
                                : 'We prioritize your satisfaction, offering personalized support to ensure your home appliances meet your needs seamlessly. Contact us today for unparalleled assistance.',
                        imgSrc:
                            'https://partners.tamkeenstores.com.sa/assets/new-media/682759316ea53ed67045f1ec01efb6f71713958008.svg',
                        route: `${origin}/${lang}/contact-us`,
                    },
                ].map((service, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg py-2 md:py-6 px-2 md:px-8 text-center"
                    >
                        <div className="h-24 w-24 bg-[#219EBC20] fill-[#219EBC] flex items-center justify-center rounded-full mx-auto">
                            <Image
                                src={service.imgSrc}
                                alt={service.title}
                                title={service.title}
                                width={50}
                                height={50}
                            />
                        </div>
                        <h4 className="heading__base">{service.title}</h4>
                        <p className="para__xs">{service.description}</p>
                        <button
                            onClick={() => router.push(service.route)}
                            className="readmore__btn"
                            aria-label={service.title}
                        >
                            {lang === 'ar' ? 'الحصول علي الخدمة' : 'Read More Details'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TamkeenServices;
