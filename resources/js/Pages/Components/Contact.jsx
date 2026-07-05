import { useState } from 'react';
import axiosInstance from '@/Pages/axiosInstance.js';
import { site } from '@/config/site';

const place = {
    name: site.legalName,
    address: site.address.full,
    lat: site.geo.lat,
    lng: site.geo.lng,
};

const mapsPlaceUrl =
    'https://www.google.com/maps/place/%D0%9F%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B5%D0%B9/@47.0374211,28.7615023,17z';

const mapsDirections =
    `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=driving`;

const mapsEmbed =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.06!2d28.758927!3d47.0374211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cbd7007acefa6f%3A0xca8f2c22dc797176!2z0J_QvtC70LjRgNC-0LLQutCwINCw0LLRgtC-0LzQvtCx0LjQu9C10Lk!5e0!3m2!1sru!2smd!4v1740000000000!5m2!1sru!2smd';

export default function Contact() {
    const [statusMsg, setStatusMsg] = useState('');
    const [name, setName] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phoneValue.trim()) {
            setStatusMsg('Укажите телефон — перезвоним в течение 15 минут.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phoneValue);
        formData.append('message', message);

        setStatusMsg('Отправка...');

        try {
            const res = await axiosInstance.post('/lead/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.status === 'success') {
                setStatusMsg('Готово! Скоро свяжемся с вами.');
                setName('');
                setPhoneValue('');
                setMessage('');
            } else {
                setStatusMsg(res.data.message || 'Не удалось отправить. Попробуйте ещё раз.');
            }
        } catch (err) {
            console.error(err);
            setStatusMsg('Ошибка сети. Позвоните: ' + site.phone);
        }
    };

    return (
        <section className="px-4 py-10 sm:py-14">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Контакты</h2>
                    <p className="mt-2 text-gray-400 text-sm sm:text-base">
                        Полировка авто в Кишинёве — звоните или пишите
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <a
                        href={`tel:${site.phone}`}
                        className="flex flex-col items-center justify-center gap-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                    >
                        <span>Позвонить</span>
                        <span className="text-xs opacity-90">{site.phone}</span>
                    </a>
                    <a
                        href={site.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-1 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition"
                    >
                        <span>WhatsApp</span>
                        <span className="text-xs opacity-90">{site.phone}</span>
                    </a>
                    <a
                        href={site.telegram}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-1 py-3 px-4 rounded-xl bg-[#0c1826] border border-[#1b3247] hover:border-blue-500 text-white text-sm font-medium transition"
                    >
                        <span>Telegram</span>
                        <span className="text-xs opacity-90">{site.phone}</span>
                    </a>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-[#0c1826] border border-[#1b3247] text-center">
                    <p className="text-white font-medium">{place.name}</p>
                    <p className="text-gray-300 text-sm mt-1">{place.address}</p>
                    <p className="text-gray-400 text-sm mt-2">{site.hours}</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
                        <a
                            href={mapsDirections}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                        >
                            Проложить маршрут
                        </a>
                        <a
                            href={mapsPlaceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#101f30] border border-[#1b3247] hover:border-blue-500 text-blue-400 text-sm font-medium transition"
                        >
                            Google Maps
                        </a>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#0c1826] border border-[#1b3247] rounded-2xl p-5 sm:p-6 space-y-3"
                >
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#101f30] text-white border border-[#1b3247] rounded-xl px-4 py-3 text-base placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="tel"
                        placeholder={`Телефон * (например ${site.phone})`}
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        required
                        className="w-full bg-[#101f30] text-white border border-[#1b3247] rounded-xl px-4 py-3 text-base placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                        placeholder="Что нужно сделать? (марка, модель, услуга)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="w-full bg-[#101f30] text-white border border-[#1b3247] rounded-xl px-4 py-3 text-base placeholder:text-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
                    >
                        Отправить заявку
                    </button>

                    {statusMsg && (
                        <p
                            className={`text-center text-sm ${
                                statusMsg.includes('Ошибка') || statusMsg.includes('Не удалось') || statusMsg.includes('Укажите')
                                    ? 'text-red-400'
                                    : statusMsg === 'Отправка...'
                                      ? 'text-gray-400'
                                      : 'text-green-400'
                            }`}
                        >
                            {statusMsg}
                        </p>
                    )}
                </form>

                <div className="mt-6 rounded-xl overflow-hidden border border-[#1b3247] h-56 sm:h-72">
                    <iframe
                        src={mapsEmbed}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${place.name} — ${place.address}`}
                    />
                </div>
            </div>
        </section>
    );
}
