import { FC, useCallback, useMemo, useState } from "react";
import { MessageCircleMore } from "lucide-react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import MessageNode from "./components/react-flow/MessageNode";

const initialNodes: any[] = [];

const initialEdges: any[] = [];

const App: FC = () => {
  const [nodes, setNodes] = useState<any>(initialNodes);
  const [edges, setEdges] = useState<any>(initialEdges);

  const nodeTypes = useMemo(() => ({ messageNode: MessageNode }), []);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: any) => setEdges((eds: any) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleSubmit = useCallback(() => {
    console.log("edges", edges);
    console.log("nodes", nodes);
  }, [edges, nodes]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-inter">
      <header className="border-b p-2 px-4 flex items-center justify-end">
        <button
          onClick={handleSubmit}
          className="p-2 px-4 border-2 rounded-md text-sm font-medium text-blue-600 border-blue-600"
        >
          Save changes
        </button>
      </header>
      <main className="flex-1 flex ">
        <section className="flex-1">
          <ReactFlow
            style={{
              height: "100%",
              width: "100%",
            }}
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </section>
        <section className="w-[360px] border-l p-2 px-4">
          <button
            onClick={() => {
              let newNode = {
                id: (nodes.length + 1).toString(),
                type: "messageNode",
                data: {
                  value: "",
                  onChange: () => {},
                },
                position: { x: 100, y: 100 },
              };

              if (nodes.length === 0) {
                newNode[`position`] = { x: 100, y: 100 };
              } else {
                newNode[`position`] = {
                  x: (nodes.length + 1) * 100,
                  y: (nodes.length + 1) * 100,
                };
              }

              const newNodes = [...nodes, newNode];

              setNodes(newNodes);
            }}
            className="border-2 border-blue-600 p-2 px-4 text-sm rounded-md text-blue-600 flex flex-col gap-1 items-center w-[12rem]"
          >
            <MessageCircleMore className="h-4 w-4" /> <span>Message</span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default App;
