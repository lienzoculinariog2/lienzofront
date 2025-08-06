import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <div className="bg-primary-background-500">
        <h1 className="text-3xl font-bold underline text-primary-txt-500 ">
          Lienzo Culinaro!
        </h1>
        <br/>
        <Button variant="alternative"> Boton de prueba </Button>
        <Button variant="light"> Boton de prueba </Button>
        <Button variant="default"> Boton de prueba </Button>
        <Button variant="dark"> Boton de prueba </Button>
        <Button variant="dailyMenu"> Boton de prueba </Button>
        <Button variant="lowCalories"> Boton de prueba </Button>
        <Button variant="celiac"> Boton de prueba </Button>
        <Button variant="vegan"> Boton de prueba </Button>
        <Button variant="vegetarian"> Boton de prueba </Button>
      </div>
    </>
  );
}
