import { memo } from "react";

const ProductDetails = memo(({ p }) => {
    const { name, description, price } = p;
    console.log(`Card di ${name} generata`)
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://picsum.photos/300/200" className="w-100 rounded" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">{price}&euro;</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default ProductDetails
