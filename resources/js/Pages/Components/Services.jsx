export default function Services() {
    const services = [
        { title: 'Полировка кузова', desc: 'Удаляем дефекты и восстанавливаем блеск.' },
        { title: "Полировка фар и оптики", desc: "Восстановление прозрачности фар, устранение помутнения, желтизны, царапин" },
        { title: 'Оклейка бронеплёнкой (PPF)', desc: 'Защита лакокрасочного покрытия до 2 лет.' },
    ];

    return (
        <div className="container mx-auto py-14 max-w-6xl">
            <h2 className="text-3xl mb-6 font-semibold">Наши услуги</h2>
            <div className="grid md:grid-cols-4 gap-6">
                {services.map((service, i) => (
                    <div key={i} className="bg-[#0f141b] p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
                        <h3 className="text-xl mb-2 font-semibold">{service.title}</h3>
                        <p className="text-[#bcd2e6]">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
