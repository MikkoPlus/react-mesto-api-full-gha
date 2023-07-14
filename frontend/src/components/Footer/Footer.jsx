function Footer({additionalClass}) {
  return (
    <footer className={`footer ${additionalClass}`} >
      <p className="footer__copyright">&copy; 2023 Mesto Russia</p>
    </footer>
  );
}

export default Footer;
