import DragDropContainer from "./components/DragDrop/DragDropContainer";
import DragNDropProvider from "./components/DragDrop/DragNDropProvider";

export default function App() {
  return (
    <main className="flex h-screen justify-center items-center bg-gray-50">
      <div className="flex gap-5">
        <DragNDropProvider>
          <DragDropContainer />
        </DragNDropProvider>
      </div>
    </main>
  );
}
