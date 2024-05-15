"use client"
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc,getDocs } from 'firebase/firestore';
import {firebaseConfig}  from "@/components/component/fireconf"
import { toast } from 'react-toastify';
import { Card,CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default function Home() {
  const [shortcuts, setShortcuts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchShortcuts();
  }, []);

const fetchShortcuts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'shortcuts'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setShortcuts(data);
  } catch (error) {
    console.error('Error fetching shortcuts:', error);
  }
};

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    if (name.toLowerCase().includes('parcoil')) {
      throw new Error('Shortcut name cannot contain "Parcoil"');
    }
    const author = formData.get('author');
    const downloadUrl = formData.get('downloadUrl');

    try {
      const docRef = await addDoc(collection(db, 'shortcuts'), {
        name,
        author,
        downloadUrl
      });
      console.log('Shortcut added with ID: ', docRef.id);
      toast.success('Shortcut Uploaded!');
      setShowModal(false);
      fetchShortcuts(); // Fetch shortcuts again to update the list
    } catch (error) {
        toast.error('Failed to Upload shortcut Check Console for more', error,);
      console.error('Error adding shortcut:', error);
      
    }
  };

  return (
    <div>
      <h1 className='text-center text-4xl m-4'>Shortcuts</h1>
      <div className='w-[500px] flex gap-2 justify-center mx-auto flex-row flex-wrap'>
        
        {shortcuts.map((shortcut, index) => (
          <Card key={index} className="min-w-[200px] max-w-[200px]">
              <CardHeader>
    <CardTitle>{shortcut.name}</CardTitle>
    <CardDescription>Author: {shortcut.author}</CardDescription>
  </CardHeader>
    <CardContent>
    <p>Card Content</p>
  </CardContent>
    <CardFooter>
    <Button asChild>
        <Link href={shortcut.downloadUrl} download>
              Download
              </Link>
            </Button>
  </CardFooter>
            
          </Card>
        ))}
      </div>
      <Button onClick={() => setShowModal(true)}>Upload Shortcut</Button>
<Dialog>
  
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
        <form onSubmit={handleUpload}>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="text" name="author" placeholder="Author" />
          <Input type="text" name="downloadUrl" placeholder="Download URL" />
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose >
        <Button type="submit">Confirm</Button>
        
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
      </form>
    </DialogContent>
  
</Dialog>



      {showModal && (
        <div className="modal">
          <form onSubmit={handleUpload}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="author" placeholder="Author" />
            <input type="text" name="downloadUrl" placeholder="Download URL" />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
