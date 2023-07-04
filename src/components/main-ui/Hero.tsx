
import { IconGithub } from "@/components/main-ui/icons";
import GradientBg from "./GradientBg";
import NavLink from "./NavLink";

export default function Hero() {
  return (
    <section className='py-20 relative sm:py-24'>
      <div className='custom-screen relative z-10'>
        <div className='max-w-3xl mx-auto text-center space-y-6'>
          <h1 className='text-gray-800 dark:text-white text-4xl font-extrabold sm:text-6xl'>
            Build beautiful websites regardless of your design skills.
          </h1>
          <p className='mt-6 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
            Move faster with beautiful, responsive UI components and website
            templates with modern design.
          </p>
          <div className='flex items-center justify-center gap-x-3 font-medium text-sm'>
            <NavLink
              href='/docs'
              target='_blank'
              className='text-white bg-gray-900 hover:bg-gray-700 shadow-md ring-offset-2 ring-gray-800 focus:ring duration-150 dark:text-white dark:bg-indigo-600 dark:hover:bg-indigo-700'>
              Get started now
            </NavLink>
            <NavLink
              href='https://github.com/MarsX-dev/floatui'
              target='_blank'
              className='flex items-center gap-x-2 text-gray-800 bg-white hover:bg-gray-100 shadow-md border ring-offset-2 ring-gray-800 focus:ring duration-150 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>
              <IconGithub className='w-5 h-5' />
              Star on GitHub
            </NavLink>
          </div>
        </div>
      </div>
      <GradientBg />
    </section>
  );
};
