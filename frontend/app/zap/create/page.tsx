"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Appbar } from "@/components/Appbar";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { BACKEND_URL } from "@/app/config";

import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(x => setAvailableTriggers(x.data.availableTriggers));

        axios.get(`${BACKEND_URL}/api/v1/action/available`)
            .then(x => setAvailableActions(x.data.availableActions));
    }, []);

    return {
        availableActions,
        availableTriggers
    };
}

export default function ZapFlow() {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    // Memoized nodeTypes and edgeTypes
    const nodeTypes = useMemo(() => ({
      // Define your custom node types here
    }), []);

    const edgeTypes = useMemo(() => ({
      // Define your custom edge types here
    }), []);

    const [selectedTrigger, setSelectedTrigger] = useState<null | { id: string; name: string; }>(null);
    const [selectedActions, setSelectedActions] = useState<any[]>([]);

    const handleAddTriggerNode = () => {
        const triggerNode = {
            id: `trigger-1`,
            data: { label: selectedTrigger?.name || 'Trigger' },
            position: { x: 250, y: 100 },
            type: 'input'
        };
        setNodes(nds => [...nds, triggerNode]);
    };

    const handleAddActionNode = () => {
        const actionNode = {
            id: `action-${nodes.length + 1}`,
            data: { label: 'Action' },
            position: { x: 250, y: 150 * (nodes.length + 1) },
            type: 'default'
        };
        setNodes(nds => [...nds, actionNode]);
    };

    const handlePublish = async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
            "availableTriggerId": selectedTrigger?.id,
            "triggerMetadata": {},
            "actions": selectedActions.map(a => ({
                availableActionId: a.availableActionId,
                actionMetadata: a.metadata
            }))
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        router.push("/dashboard");
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Appbar />
            <div className="flex justify-end bg-slate-200 p-4">
                <PrimaryButton onClick={handlePublish}>Publish</PrimaryButton>
            </div>
            <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
                {/* Ensure ReactFlow container has explicit dimensions */}
                <div style={{ width: '100%', height: '600px' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={params => setEdges(edgs => addEdge(params, edgs))}
                        fitView
                        nodeTypes={nodeTypes} // Pass memoized nodeTypes
                        edgeTypes={edgeTypes} // Pass memoized edgeTypes
                    >
                        <Background />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>
                <div className="flex justify-center">
                    <PrimaryButton onClick={handleAddActionNode}>
                        <div className="text-2xl">+</div>
                    </PrimaryButton>
                </div>
            </div>
            {selectedModalIndex && (
                <Modal
                    availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions}
                    onSelect={(props: null | { name: string; id: string; metadata: any; }) => {
                        if (props === null) {
                            setSelectedModalIndex(null);
                            return;
                        }
                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name
                            });
                            handleAddTriggerNode();
                        } else {
                            setSelectedActions(a => {
                                let newActions = [...a];
                                newActions[selectedModalIndex - 2] = {
                                    index: selectedModalIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    metadata: props.metadata
                                };
                                return newActions;
                            });
                            handleAddActionNode();
                        }
                        setSelectedModalIndex(null);
                    }}
                    index={selectedModalIndex}
                />
            )}
        </div>
    );
}

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, availableItems: { id: string, name: string, image: string; }[] }) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();
    const isTrigger = index === 1;

    return <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <div className="text-xl">
                        Select {index === 1 ? "Trigger" : "Action"}
                    </div>
                    <button onClick={() => {
                        onSelect(null);
                    }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    {step === 1 && selectedAction?.id === "email" && <EmailSelector setMetadata={(metadata) => {
                        onSelect({
                            ...selectedAction,
                            metadata
                        });
                    }} />}

                    {(step === 1 && selectedAction?.id === "send-sol") && <SolanaSelector setMetadata={(metadata) => {
                        onSelect({
                            ...selectedAction,
                            metadata
                        });
                    }} />}

                    {step === 0 && <div>{availableItems.map(({ id, name, image }) => {
                        return <div key={id} onClick={() => {
                            if (isTrigger) {
                                onSelect({
                                    id,
                                    name,
                                    metadata: {}
                                });
                            } else {
                                setStep(s => s + 1);
                                setSelectedAction({
                                    id,
                                    name
                                });
                            }
                        }} className="flex border p-4 cursor-pointer hover:bg-slate-100">
                            <img src={image} width={30} className="rounded-full" /> <div className="flex flex-col justify-center"> {name} </div>
                        </div>;
                    })}</div>}
                </div>
            </div>
        </div>
    </div>;
}

function EmailSelector({ setMetadata }: { setMetadata: (params: any) => void; }) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return <div>
        <Input label={"To"} type={"text"} placeholder="To" onChange={(e) => setEmail(e.target.value)}></Input>
        <Input label={"Body"} type={"text"} placeholder="Body" onChange={(e) => setBody(e.target.value)}></Input>
        <div className="pt-2">
            <PrimaryButton onClick={() => {
                setMetadata({
                    email,
                    body
                });
            }}>Submit</PrimaryButton>
        </div>
    </div>;
}

function SolanaSelector({ setMetadata }: { setMetadata: (params: any) => void; }) {
    const [walletAddress, setWalletAddress] = useState("");
    const [amount, setAmount] = useState("");

    return <div>
        <Input label={"Wallet Address"} type={"text"} placeholder="Wallet Address" onChange={(e) => setWalletAddress(e.target.value)}></Input>
        <Input label={"Amount"} type={"text"} placeholder="Amount" onChange={(e) => setAmount(e.target.value)}></Input>
        <div className="pt-2">
            <PrimaryButton onClick={() => {
                setMetadata({
                    walletAddress,
                    amount
                });
            }}>Submit</PrimaryButton>
        </div>
    </div>;
}
