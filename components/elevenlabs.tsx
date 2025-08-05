'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { Headphones, HeadphoneOff, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useProfile } from '@/hooks/useProfile';

export function Conversation({target_country}: {target_country: string}) {
  const { profile, isLoading } = useProfile();

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
    onAudio: () => console.log('Audio received'),
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

      const dynamicVariables = {
        user__target__country: target_country || '',
        user__name: profile?.full_name?.split(' ')[0] || '',
        user__age: profile?.age || 0,
        user__degree: profile?.degree || '',
        user__institution: profile?.institution || '',
        user__job_title: profile?.job_title || '',
        user__current_country: profile?.country || '',
        user__citizenships: profile?.citizenships?.join(',') || '',
        user__marital_status: profile?.marital_status || '',
        user__children: profile?.children || 0,
      }

      // Start the conversation with your agent
      await conversation.startSession({ signedUrl: signedUrl, dynamicVariables, userId: profile?.id });

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
      className={`p-2 text-white transition-colors ${
        conversation.status === 'connected' 
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-primary hover:bg-primary/80'
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : conversation.status === 'connected' ? (
        <HeadphoneOff className="w-5 h-5" />
      ) : (
        <Headphones className="w-5 h-5" />
      )}
    </Button>
  );
}
