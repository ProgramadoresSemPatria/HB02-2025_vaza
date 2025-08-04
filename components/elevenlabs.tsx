'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { Headphones, HeadphoneOff } from 'lucide-react';
import { Button } from './ui/button';

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
    onAudio: (audio) => console.log('Audio received:', audio),
  });

  const getSignedUrl = async (): Promise<string> => {
  const response = await fetch("/api/get-signed-url");
  if (!response.ok) {
    throw new Error(`Failed to get signed url: ${response.statusText}`);
  }
    const { signedUrl } = await response.json();
    return signedUrl;
  };

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const signedUrl = await getSignedUrl();

      // Start the conversation with your agent
      await conversation.startSession({ signedUrl: signedUrl });

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <Button
      onClick={conversation.status === 'connected' ? stopConversation : startConversation}
      className="p-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
    >
      {conversation.status === 'connected' ? (
        <HeadphoneOff className="w-5 h-5" />
      ) : (
        <Headphones className="w-5 h-5" />
      )}
    </Button>
  );
}
