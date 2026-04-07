function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        display: "flex",
        color: "white",
        textAlign: "center",
        padding: "20px",
        marginTop: "auto",
        bottom: 0,
        width: "100%",
        alignItems: "center",
      }}
    >
      <p>&copy; {new Date().getFullYear()} UniBlog. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
