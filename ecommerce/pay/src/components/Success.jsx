import React from 'react'

const Success = () => {
  return (
    <div 
        style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <button
            style={{
                border: "none",
                width: 120,
                borderRadius: 5,
                padding: "20px",
                backgroundColor: "tale",
                fontWeight: "600",
                cursor: "pointer",
            }}
        >
            Successfull.
        </button>
        Your order is being prepared. Thanks for choosing Lama Shop
        
    </div>
  )
}

export default Success