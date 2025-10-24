import { useState } from "react";
import axiosInstance from "@/Pages/axiosInstance.js";

export default function Contacts() {
    const [statusMsg, setStatusMsg] = useState("");
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка, если есть фото — телефон обязателен
        if ((photo && !phone) || (!name && !phone && !email && !message)) {
            setStatusMsg("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        const formData = new FormData();
        if (photo) formData.append("photo", photo);
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("message", message);

        setStatusMsg("Отправка...");

        try {
            const res = await axiosInstance.post("/lead/send", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.status === "success") {
                setStatusMsg("Заявка успешно отправлена!");
                setPhoto(null);
                setName(""); setPhone(""); setMessage("");
            } else {
                setStatusMsg("Ошибка при отправке, попробуйте снова.");
            }
        } catch (err) {
            console.error(err);
            setStatusMsg("Ошибка сети или сервера, попробуйте позже.");
        }
    };

    return (
        <section id="contact" className="container mx-auto py-20 px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Контакты</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Свяжитесь с нами любым удобным способом или отправьте заявку с фото для быстрой оценки.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Контактная информация */}
                <div className="space-y-6 text-gray-300">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Адрес</h3>
                        <p>Кишинёв, ул. Молдова №123</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Телефон</h3>
                        <p>+373 69 204 272</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
                        <p>
                            <a href="https://wa.me/37369204272" className="text-blue-400 hover:underline">
                                Написать в WhatsApp
                            </a>
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Telegram</h3>
                        <p>
                            <a href="https://t.me/prime_detail" className="text-blue-400 hover:underline">
                                @prime_detail
                            </a>
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                        <p>
                            <a href="mailto:info@primedetail.md" className="text-blue-400 hover:underline">
                                info@primedetail.md
                            </a>
                        </p>
                    </div>
                </div>

                {/* Форма объединённая */}
                <form className="bg-[#0c1826] p-6 rounded-2xl shadow-md space-y-4" onSubmit={handleSubmit}>
                    {/* Имя */}
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2"
                    />

                    {/* Телефон */}
                    <input
                        type="tel"
                        placeholder="Телефон"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2"
                    />

                    {/* Фото */}
                    <div className="relative">
                        <div
                            className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-colors rounded-2xl shadow-lg p-2 cursor-pointer">
                            <span className="text-white ml-4">
                                {photo ? photo.name : "Прикрепите фото (опционально)"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer rounded-2xl"
                            />
                        </div>
                        <p className="text-gray-400 mt-2 text-sm">
                            Фото помогает получить точную оценку. Максимум 5 МБ.
                        </p>
                    </div>

                    {/* Сообщение */}
                    <textarea
                        placeholder="Комментарий / сообщение"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2"
                        rows={4}
                    ></textarea>

                    {/* Кнопка */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition"
                    >
                        Отправить
                    </button>

                    {statusMsg && (
                        <p className={`mt-4 text-center font-medium ${statusMsg.includes("Ошибка") ? "text-red-500" : "text-green-400"}`}>
                            {statusMsg}
                        </p>
                    )}
                </form>
            </div>

            {/* Карта */}
            <div className="mt-12 h-64 md:h-96 rounded-2xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.123456!2d28.833333!3d47.010000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c8c00000000001%3A0xabcdef!2sPrime+Detail!5e0!3m2!1sen!2smd!4v169XXX"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Prime Detail Map"
                ></iframe>
            </div>
        </section>
    );
}
