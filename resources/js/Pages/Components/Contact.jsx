export default function Contact({ formData, setFormData, submitForm, formStatus }) {
    return (
        <section id="contact" className="container mx-auto py-14 max-w-6xl">
            <h2 className="text-3xl mb-6 font-semibold">Свяжитесь с нами</h2>
            <form onSubmit={submitForm} className="grid gap-4 bg-[#0f141b] p-6 rounded-xl shadow-md max-w-lg mx-auto">
                <input className="input bg-[#0c1826]" placeholder="Имя" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} required />
                <input className="input bg-[#0c1826]" placeholder="Телефон" value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} required />
                <textarea className="input bg-[#0c1826]" placeholder="Сообщение" value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})} />
                <button type="submit" className="btn">{formStatus || 'Отправить'}</button>
            </form>
        </section>
    );
}
