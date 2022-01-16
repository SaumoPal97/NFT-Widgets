import WidgetCreator from "./WidgetCreator";

function App() {
  return (
    <div className="flex flex-col items-center m-10">
      <span className="text-5xl font-bold text-purple-500 font-mono uppercase">
        NFT Widget Maker
      </span>
      <WidgetCreator />
    </div>
  );
}

export default App;
