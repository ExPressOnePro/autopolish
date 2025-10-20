import { useState } from "react";
import axiosInstance from "@/Pages/axiosInstance.js";

export default function ContactForm() {
    const [statusMsg, setStatusMsg] = useState("");
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (photo) formData.append("photo", photo);
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("message", message);

        try {
            const res = await axiosInstance.post("/lead/send", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.status === "success") {
                setStatusMsg("Заявка успешно отправлена!");
                setPhone("");
                setName("");
                setMessage("");
                setPhoto(null);
            } else {
                setStatusMsg("Ошибка при отправке, попробуйте снова.");
            }
        } catch (err) {
            console.error(err);
            setStatusMsg("Ошибка сети или сервера, попробуйте позже.");
        }
    };

    return (
        <section className="py-16 px-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-3xl shadow-2xl sm:p-6 md:p-8 lg:p-12">
                <h2 className="text-4xl font-bold text-center text-white mb-4">
                    Отправьте фото для оценки
                </h2>

                <p className="text-center text-gray-300 mb-10">
                    Минимум данных: фото, телефон и имя, если хотите, чтобы с вами связались
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Имя */}
                    <div>
                        <label className="block text-gray-200 mb-2">Ваше имя (опционально)</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введите имя"
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
                        />
                    </div>

                    {/* Фото */}
                    <div className="relative">
                        <label className="block text-gray-200 mb-2 font-medium text-sm">
                            📸 Прикрепите фото для быстрой оценки
                        </label>

                        <div
                            className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-colors rounded-2xl shadow-lg p-2 cursor-pointer">
        <span className="text-white ml-4">
            {photo ? photo.name : "Выберите фото"}
        </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer rounded-2xl"
                            />
                        </div>

                        <p className="text-gray-400 mt-2 text-sm">
                            Фото помогает получить точную оценку стоимости услуги. Максимум 5 МБ.
                        </p>
                    </div>


                    {/* Телефон */}
                    <div>
                        <label className="block text-gray-200 mb-2">Телефон</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Введите телефон"
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                            Телефон обязателен, если вы отправляете фото.
                        </p>
                    </div>

                    {/* Комментарий */}
                    <div>
                        <label className="block text-gray-200 mb-2">Комментарий (опционально)</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Например: хочу оценку"
                            rows="4"
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
                        ></textarea>
                    </div>

                    {/* Кнопка */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow-lg"
                    >
                        Отправить
                    </button>
                </form>

                {/* Статус */}
                {statusMsg && (
                    <p
                        className={`mt-6 text-center font-medium ${
                            statusMsg.includes("Ошибка") ? "text-red-500" : "text-green-400"
                        }`}
                    >
                        {statusMsg}
                    </p>
                )}
            </div>
        </section>
    );
}
