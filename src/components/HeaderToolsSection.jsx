import ToolName from './ToolName'
import { tools, categories } from '@/data/toolsData'

function HeaderToolsSection({ setIsActiveTools, setIsActiveHamBurger }) {
  const shortNames = {
  'add pages to pdf': 'Add Pages',
  'add pdf in pdf': 'Add PDF',
  'remove pdf pages': 'Remove Pages',
}
  return (
    <div
      className="mx-auto max-w-[92vw] rounded-2xl border border-gray-100 bg-white p-6
                 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <p className="text-sm font-semibold tracking-wide text-gray-900">
          All PDF Tools
        </p>
        <span className="rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-500">
          {tools.length} tools · free to use
        </span>
      </div>

      {/* Saari categories ek row mein, usi width ke andar */}
      <div className="mt-5 flex max-h-[70vh] flex-col gap-6 overflow-y-auto overflow-x-hidden pr-1 lg:flex-row lg:gap-x-4">
        {categories.map((category) => {
          const categoryTools = tools.filter(
            (tool) => tool.category === category.id
          )
          const CategoryIcon = category.icon
          return (
            <div key={category.id} className="flex-1 basis-0">
              {/* Category header */}
              <div className="mb-1.5 flex min-w-0 items-center gap-1.5 px-1">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${category.chip}`}
                >
                  <CategoryIcon className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <p className="truncate text-[12px] font-semibold text-gray-800">
                  {category.name}
                </p>
              </div>

              {/* Tools */}
              <ul className="flex flex-col gap-1">
                {categoryTools.map((tool) => {
                  const toolName = shortNames[tool.name.toLowerCase()] ?? tool.name
                  return <ToolName
                    key={tool.href}
                    href={tool.href}
                    title={toolName}
                    Icon={tool.icon}
                    description={tool.description}
                    textColor={tool.textColor}
                    setIsActiveTools={setIsActiveTools}
                    setIsActiveHamBurger={setIsActiveHamBurger}
                  />
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HeaderToolsSection