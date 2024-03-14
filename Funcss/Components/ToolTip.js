const ToolTip = ({funcss , children}) => {
    return ( 
    <span className={`tooltip ${funcss}`}>
        {children}
    </span> 
    );
}
 
export default ToolTip;