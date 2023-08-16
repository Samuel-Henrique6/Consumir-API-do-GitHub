const Header = ({ h, title }) => {
    
    const CustomTag = h;

    return (
        <CustomTag className={`text-center pt-5`}>{title}</CustomTag>
    );
};

export default Header;