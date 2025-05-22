import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

// function InterviewCard({ interview, viewDetail= false }) {
function InterviewCard({
  interview,
  viewDetail = false,
  showCandidates = true,
}) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const onSend = () => {
    window.location.href =
      "mailto:fh243901@gmail.com?subject=AICruiter Interview Link & body=Hello, I would like to share this interview link with you:" +
      url;
  };

  return (
    <div className="p-5 bg-white rounded-lg border  ">
      <div className="flex items-center justify-between">
        <div className="relative group">
          <div className="w-[40px] h-[40px] bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
            {interview?.userEmail?.split("@")[0]?.substring(0, 2)}
          </div>
          <div className="absolute z-10 left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {interview?.userEmail}
          </div>
        </div>

        <h2 className="text-sm">
          {moment(interview?.created_at).format("DD MMM YYYY")}
        </h2>
      </div>
      <h2 className="font-bold text-lg mt-3 ">{interview?.jobPosition}</h2>
      <h2 className="flex justify-between font-normal text-base">
        {interview?.duration}
        {showCandidates && (
          <span className="text-green-500">
            {interview["interview-feedback"]?.length} Candidates
          </span>
        )}
      </h2>
      {!viewDetail ? (
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={copyLink}>
            <Copy /> Copy Link
          </Button>
          <Button className="flex-1" onClick={onSend}>
            <Send />
            Send
          </Button>
        </div>
      ) :  (
        <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
        <Button className="mt-5 w-full cursor-pointer" variant={"outline"}>
          View Detail <ArrowRight />
        </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
