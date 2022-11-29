import './App.css';

function App() {
  return (
    <div className="App">
      
      <nav class="bg-white border-gray-200 px-2 md:px-4 py-2.5 dark:bg-gray-900">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <a href="https://flowbite.com" class="flex items-center">
                  <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                  <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Crowd Label</span>
              </a>
              <div class="flex items-center md:order-2">
                  <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Login with Wallet</a>
                  <button data-collapse-toggle="mega-menu" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded="false">
                      <span class="sr-only">Open main menu</span>
                      <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                  </button>
              </div>
          </div>
      </nav>
      <div class="page" id="first_page">
        First
      </div>
      <div class="page" id="second_page">
        Second
      </div>


    </div>
  );
}

export default App;
