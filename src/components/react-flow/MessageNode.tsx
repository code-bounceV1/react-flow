import { FC, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { MessageCircleMore } from "lucide-react";

type Props = {
  data: {
    value: string;
    onChange: (val: string) => void;
  };
  id: string;
};

const MessageNode: FC<Props> = ({ data }) => {
  const onChange = useCallback((evt: any) => {
    data.onChange(evt.target.value);
  }, []);
  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable />
      <div className="border-2 focus-within:border-blue-600 rounded-md overflow-hidden shadow-sm flex flex-col min-w-[15rem] w-full">
        <div className="bg-green-100 p-1 px-2">
          <div className="flex items-center gap-1">
            <MessageCircleMore className="h-4 w-4" />
            <p className="text-sm font-medium">Send message</p>
          </div>
        </div>
        <input
          id="text"
          name="text"
          value={data.value}
          onChange={onChange}
          className="nodrag text-sm p-2 focus:outline-none"
          placeholder="Type your message"
        />
      </div>
      <Handle type="source" position={Position.Right} isConnectable />
    </>
  );
};

export default MessageNode;
