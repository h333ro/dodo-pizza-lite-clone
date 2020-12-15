import black_friday from "../../assets/image/black_friday.jpeg";
import two_pizza from "../../assets/image/2pizza.jpeg";
import cesar from "../../assets/image/cesar.jpeg";
import React, {useEffect, useState} from "react";
import Slider from "infinite-react-carousel";

const carouselArray = [
    {img:black_friday},
    {img:two_pizza},
    {img:cesar},
];

export const AdCarousel:React.FC = props => {

    const [settings,setSettings] = useState({
        centerMode:true,
        centerPadding:document.documentElement.clientWidth * 0.15,
        dots:true,
    });

    useEffect(()=>{
        const handleResize = () =>{
            if(document.documentElement.clientWidth<1500){
                setSettings(c => ({...c,centerPadding: 100}));
            }
            if(document.documentElement.clientWidth<1000){
                setSettings(c => ({...c,centerPadding: 50}));
            }
            if(document.documentElement.clientWidth>1500){
                setSettings(c => ({...c,centerPadding: 250}));
            }
        };
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[]);

    return (
        <div className={'main-carousel'}>
            <Slider { ...settings }>
                {carouselArray.map((i,index) => {
                    return (
                        <div key={index} className={'main-carousel__slide'}>
                            <img src={i.img} alt={'carousel-'+index}/>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}