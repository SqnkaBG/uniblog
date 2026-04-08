const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    //submit form so user can log in
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>email</label>
      <input></input>
      <label>password</label>
      <input></input>
      <button>OK</button>
    </form>
  );
};
export default LoginPage;
