// src/components/ContactForm.jsx
export default function ContactFormHTML(email) {
  return `
  <section style="padding:2rem; max-width:800px; margin:auto;">
    <h2>Contact Us</h2>
    <form action="mailto:${email}" method="POST" enctype="text/plain">
      <label>Name</label><br/>
      <input type="text" name="name" required style="width:100%; margin:8px 0;"><br/>
      <label>Email</label><br/>
      <input type="email" name="email" required style="width:100%; margin:8px 0;"><br/>
      <label>Message</label><br/>
      <textarea name="message" rows="5" required style="width:100%; margin:8px 0;"></textarea><br/>
      <button type="submit">Send</button>
    </form>
  </section>
  `;
}
