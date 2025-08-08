// src/app/(static)/(views)/categories/page.tsx

// **IMPORTACIÓN CORREGIDA**
import FlowbiteCard from "@/components/cards/flowbiteCard";
import { protoProduct } from "@/helpers/prototype"; 

export default function CategoriesPage() {
return (
    <div className="container mx-auto p-6">
    <h1 className="text-4xl font-bold text-center mb-8 text-primary-txt-100">
        Nuestras Categorías
    </h1>
    
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {protoProduct.map((product) => (
        
        <FlowbiteCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            stock={product.stock}
            imgURL={product.imgURL}
            isActive={product.isActive}
            caloricLevel={product.caloricLevel}
            ingredients={product.ingredients}
        />
        ))}
    </div>
    </div>
);
}