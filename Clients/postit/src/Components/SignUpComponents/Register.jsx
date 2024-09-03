const PasswordRequirements = ({ password }) => {
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;
  const uppercaseRegex = /[A-Z]/;


  const boxStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '4px',
    marginTop: '8px',
    backgroundColor: '#f9f9f9'
  };

  return (
    <>
      <div style={boxStyle}>
        <ul>
          <li style={{color: password.length >= 8 && password.length <= 12 ? 'green' : 'red'}}>
            {password.length > 8 && password.length <=12 ? }
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

      </div>
    </>
  )


};
