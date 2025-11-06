import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import dummyResumeData from "../assets/assets/assets";
import {
  ArrowLeft,
  Briefcase,
  ChevronRight,
  ChevronsLeft,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
} from "lucide-react";

function ResumeBuilder() {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = useCallback(() => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) setResumeData(resume);
  }, [resumeId]);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [_removeBackground, _setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  // const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, [loadExistingResume]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6 ">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-semibold mt-4">{resumeData.title}</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gp-8 text-white">
          {/* left side form */}

          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progess bar  activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2  border-gray-200" />
              <hr
                className="absolute top-0 left-0 right-0  h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-2000 "
                style={{
                  width: `%${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div></div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronsLeft className="size-4" />
                      Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium  text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* right side resume preview */}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
