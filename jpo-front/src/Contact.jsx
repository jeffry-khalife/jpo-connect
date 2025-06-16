export default function Contact() {
  return (
    <div className="container">
      <h2>Contact</h2>
      <form>
        <input type="email" placeholder="Votre email" required />
        <textarea placeholder="Votre message" required />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
