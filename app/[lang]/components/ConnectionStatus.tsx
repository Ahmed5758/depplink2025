'use client';
import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showOfflineNotification, setShowOfflineNotification] = useState<boolean>(false);
  const [showOnlineNotification, setShowOnlineNotification] = useState<boolean>(false);

  useEffect(() => {
    // Set initial status
    setIsOnline(navigator.onLine);
    
    // Add event listeners for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineNotification(false);
      setShowOnlineNotification(true);
      
      // Hide online notification after 3 seconds
      setTimeout(() => {
        setShowOnlineNotification(false);
      }, 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineNotification(true);
      setShowOnlineNotification(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* Offline Notification Modal */}
      <Transition appear show={showOfflineNotification} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowOfflineNotification(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all">
                  {/* Background with gradient */}
                  <div className="bg-[#DC4E4E] p-6 border border-white rounded-2xl">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 shadow-md">
                          <svg className="w-7 h-7" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-white">
                          Connection Lost
                        </Dialog.Title>
                        <div className="mt-4">
                          <p className="text-md text-white">
                            Your internet connection appears to be offline.
                          </p>
                          <p className="text-md text-white mt-2">
                            Some features may not be available until your connection is restored.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Separator line */}
                    <div className="my-6 border-t border-white"></div>
                    
                    {/* Time display */}
                    <div className="flex justify-end items-center">
                      <button
                        type="button"
                        className="inline-flex text-white justify-end rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
                        onClick={() => setShowOfflineNotification(false)}
                      >
                        Got it, thanks
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Online Notification Toast */}
      <Transition
        show={showOnlineNotification}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed top-2 right-4 z-50 max-w-sm w-full bg-[#20831E] shadow-lg rounded-lg pointer-events-auto ring-1 ring-green-200 overflow-hidden border border-[#20831E]">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-teal-100 shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-bold text-white">Connection Restored</p>
                <p className="mt-1 text-sm text-white">Your internet connection is back online.</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-green-700 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => setShowOnlineNotification(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ConnectionStatus;