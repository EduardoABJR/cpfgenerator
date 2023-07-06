
import './App.css'
import CpfValidator from './components/CPFvalidator'
import GeradorCPF from './components/GeradorCPF'

function App() {
  

  return (
    <>
    <div>
      <CpfValidator />
    </div>
      <div>
      <GeradorCPF />
      </div>
      <p className="read-the-docs">
        Desenvolvido por Eduardo Bonelli Jr
        
      </p>
    </>
  )
}

export default App
