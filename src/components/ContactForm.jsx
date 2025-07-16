export default function ContactFormHTML(email) {
  return `
  <section style="padding: 3rem 1rem; max-width: 700px; margin: auto; font-family: sans-serif;">
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1.5rem; text-align: center;">📬 Contact Us</h2>
    <form action="mailto:${email}" method="POST" enctype="text/plain" style="background: #f9f9f9; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 1rem;">
        <label style="font-weight: 600;">Name</label><br/>
        <input type="text" name="name" placeholder="Name" required 
               style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 6px; margin-top: 6px;">
      </div>

      <div style="margin-bottom: 1rem;">
        <label style="font-weight: 600;">Email</label><br/>
        <input type="email" name="email" placeholder="Email"   required 
               style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 6px; margin-top: 6px;">
      </div>

      <div style="margin-bottom: 1.5rem;">
        <label style="font-weight: 600;">Message</label><br/>
        <textarea name="message" rows="5" placeholder="Message"  required 
                  style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 6px; margin-top: 6px;"></textarea>
      </div>

      <button type="submit"
              style="background-color: #00cc99; color: white; font-weight: bold; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; transition: background 0.3s ease;">
        Send Message
      </button>
    </form>
  </section>
  `;
}
