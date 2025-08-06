import Button from "@/components/ui/Button";


export default function Home() {
  return (
    <>
     <h1 className="text-3xl font-bold text-black underline">
      Hello world!
    </h1>
    <Button variant="default"> Boton de prueba </Button>
    <Button variant="alternative"> Boton de prueba </Button>
     <Button variant="dark"> Boton de prueba </Button>
      <Button variant="light"> Boton de prueba </Button>
       <Button variant="dailyMenu"> Boton de prueba </Button>
        <Button variant="celiac"> Boton de prueba </Button>
         <Button variant="vegetarian"> Boton de prueba </Button>
          <Button variant="lowCalories"> Boton de prueba </Button>
           <Button variant="vegan"> Boton de prueba </Button>
    </>
  );
}
