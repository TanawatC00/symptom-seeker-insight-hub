
import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyModal = ({ isOpen, onClose }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedApiKey = localStorage.getItem('openai-api-key');
      if (savedApiKey) {
        setApiKey(savedApiKey);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error('กรุณาใส่ API Key');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      toast.error('API Key ต้องเริ่มต้นด้วย "sk-"');
      return;
    }

    localStorage.setItem('openai-api-key', apiKey.trim());
    toast.success('บันทึก API Key สำเร็จ');
    onClose();
  };

  const handleRemove = () => {
    localStorage.removeItem('openai-api-key');
    setApiKey('');
    toast.success('ลบ API Key สำเร็จ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-medical-blue" />
            ตั้งค่า OpenAI API Key
          </DialogTitle>
          <DialogDescription>
            ใส่ API Key ของคุณจาก OpenAI เพื่อใช้งานแชทบอท
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>หมายเหตุ:</strong> API Key จะถูกเก็บในเครื่องของคุณเท่านั้น เราไม่ได้เก็บข้อมูลนี้ไว้ในเซิร์ฟเวอร์
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">วิธีการรับ API Key:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>ไปที่ <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-medical-blue hover:underline">platform.openai.com</a></li>
              <li>สร้างบัญชีหรือเข้าสู่ระบบ</li>
              <li>สร้าง API Key ใหม่</li>
              <li>คัดลอกและนำมาใส่ที่นี่</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex-1">
              บันทึก
            </Button>
            {apiKey && (
              <Button variant="outline" onClick={handleRemove}>
                ลบ
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
