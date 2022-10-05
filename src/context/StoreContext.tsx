import { createContext, useState } from 'react';

interface ProjectViewInterface {
  data: string,
  change: Function
}

interface StoreContextInterface {
  projectView: ProjectViewInterface 
}

const init = {
  projectView : {
    data: '',
    change: () => {}
  }
}


const StoreContext = createContext<StoreContextInterface>(init)

export const StoreProvider: any = (props: any) => {

  const [projectView, setProjectView] = useState('row')

  const changeProjectView = (view: string) => {
    if (['grid', 'row'].includes(view)) {
      setProjectView(view)
    } else {
      console.log('error in project view change')
    }
  }

  const storeValue = {
    'projectView': {
      data: projectView,
      change: changeProjectView
    }
  }

  return (
    <StoreContext.Provider value={storeValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContext