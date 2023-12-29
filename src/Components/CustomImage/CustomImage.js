import React from 'react'

const CustomImage = ({
    src, 
    alt, 
    position, 
    top, bottom, left, right, 
    height, width,
    imgHeight, imgWidth,
    borderRadius,
    className,
    imgClassName
}) => {
  const style = {
    imgContainer: {
        "position": position ? position : "relative",
        "top": top ? top : "unset",
        "bottom": bottom ? bottom : "unset",
        "left": left ? left : "unset",
        "right": right ? right : "unset",

        "width": width ? width : "auto",
        "height": height ? height : "auto",
        "overflow": "hidden",
        "border-radius": borderRadius ? borderRadius : "unset",
    },
    img: {
        "object-fit": "cover",
        "width": imgWidth ? imgWidth : "auto",
        "height": imgHeight ? imgHeight : "auto",
    }
  }

  return (
    <span
    className={className}
    style={style.imgContainer}>
        <img 
        src={src}
        alt={alt}
        className={imgClassName}
        style={style.img}
        />
    </span>
  )
}

export default CustomImage