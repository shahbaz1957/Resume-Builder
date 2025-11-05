import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  X, // Corrected: Use 'X' for the close icon
} from "lucide-react";
import { useEffect, useState } from "react";
import dummyResumeData from "../assets/assets/assets";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  // const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    // In a real application, you would fetch data here
    setAllResumes(dummyResumeData);
  };

  const createResume = async (event) => {
    event.preventDefault();

    // Logic to save the new resume title and create the ID would go here
    console.log("Creating resume with title:", title);

    setShowCreateResume(false);
    setTitle(""); // Clear the title state
    navigate(`/app/builder/res123`);
  };

  const uploadResume = async (event) => {
    event.preventDefault();

    // Logic to save the new resume title and create the ID would go here
    console.log("Update resume :");

    setShowUploadResume(false);
    setTitle(""); // Clear the title state
    navigate(`/app/builder/res123`);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl px-4 py-8 ml-16">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent sm:hidden">
          Welcome Joe Doe
        </p>

        {/* Create / Upload Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* Resume List */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={index}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Hover Action Buttons */}
                <div className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1">
                  <TrashIcon className="size-7 p-1.5 rounded hover:bg-white/50 text-slate-700 transition-colors" />
                  <PencilIcon className="size-7 p-1.5 rounded hover:bg-white/50 text-slate-700 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)} // Corrected: Closes modal on backdrop click
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                value={title} // Added: Connect to state
                onChange={(e) => setTitle(e.target.value)} // Added: Update state
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded  hover:bg-green-700 transition-colors">
                Create Resume
              </button>

              <X // Corrected: Used 'X' icon from lucide-react
                className="absolute top-4 right-4 text-slate-400  hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)} // Corrected: Closes modal on backdrop click
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
              <input
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select Resume File
                  <div className="flex flex-col items-center justify-center rounded-md p-4 py-10 my-4 gap-2 text-slate-400 border group border-dashed border-slate-400 hover:border-green-500 hover:text-green-700 transition-colors cursor-pointer">
                {resume ? (
                  <p className="text-green-700">{resume.name}</p>
                ) : (
                  <>
                    <UploadCloudIcon className="size-14 stroke-1" />
                    <p>Upload resume</p>
                  </>
                )}
              </div>
                </label>
                <input type="file" accept=".pdf" id="resume-input" hidden onChange={ (e)=>{
                    setResume(e.target.files[0])
                }} />
              </div>
              
              <button className="w-full py-2 bg-green-600 text-white rounded  hover:bg-green-700 transition-colors">
                Upload Resume
              </button>

              <X // Corrected: Used 'X' icon from lucide-react
                className="absolute top-4 right-4 text-slate-400  hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
