import classes from './Button.module.css';

const Button = (props) => {
  const buttonColor = props.color ? props.color : '#38015C';

  return (
    <button
      type={props.type}
      className={classes.button}
      onClick={props.onClick}
      style={{ backgroundColor: `${buttonColor}` }}
    >
      {props.children}
    </button>
  );
};

export default Button;
