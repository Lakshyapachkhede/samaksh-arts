import './Gallery3d.css';


const images = import.meta.glob('/src/assets/3dGalleryImg/*.{jpg,jpeg}', {
    eager: true,
    import: 'default',

});


export const Gallery3d = () => {
    return (
        <div className="con-3d-outer">

            <div className="con-3d">
                {/* <span style="--i:1"><img src="images/1.jpg" alt="" /></span> */}

                {Object.entries(images).map(([path, src], index) => {
                    const name = path.split('/').pop();
                    return (
                        <span style={{ '--i': index + 1 }}>
                            <img src={src} alt={name} />
                        </span>
                    );
                })}

            </div>


        </div>




    )
}
