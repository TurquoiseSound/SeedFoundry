import { Suspense } from "react";
import Image from "next/image";
import Link from 'next/link'
import GoalsSelect from '../components/GoalsSelect';
import styles from './Home.module.scss'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex flex-col">
        <h1 className={`block text-6xl mb-10 ${styles.title}`} >Startup Ethical Economic Design</h1>
        <h3 className='text-2xl mb-10'>Find a structure for your organization that allows you to maximize your impact on the world, without compromising your vision.</h3>
        <div className='flex flex-row'>
          <Suspense fallback={<div>Loading...</div>}>
            <GoalsSelect />
          </Suspense>
          <Link className='rounded-2xl text-center px-4 py-1 ml-3 my-1 inline-block text-white bg-green-600' href="/library/entity-types">View Entity Types</Link>
          <Link className='rounded-2xl text-center px-4 py-1 ml-3 my-1 inline-block text-white bg-green-600' href="/library/funding-options">View Funding Options</Link>
          <Link className='rounded-2xl text-center px-4 py-1 ml-3 my-1 inline-block text-white bg-green-600' href="/library/business-models">View Business Models</Link>
        </div>
      </div>
    </main>
  );
}
