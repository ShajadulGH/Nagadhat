import NoDataFound from "@/app/components/NoDataFound";
import SingleMemberTeam from "./SingleMemberTeam";
import TeamTable from "./TeamTable";

const MyTeamList = ({
  firstHighestTeam,
  secondHighestTeam,
  otherTeam,
  teamGrandTotal,
  serialNumber,
  otherTotalMembers,
  teamResultData
}) => {
  const isFirstTeamEmpty = Object.keys(firstHighestTeam).length === 0;
  const isSecondTeamEmpty = Object.keys(secondHighestTeam).length === 0;
  const isOtherTeamEmpty = otherTeam?.length === 0;

  const allTeamsEmpty = isFirstTeamEmpty && isSecondTeamEmpty && isOtherTeamEmpty;

  if (allTeamsEmpty) {
    return <NoDataFound title="Sales Team Not Found" />;
  }

  return (
    <>
      <SingleMemberTeam 
        title="1st Sales Team" 
        member={firstHighestTeam} 
        isSalesCompleted={teamResultData?.is_line_01_sales_completed}
      />
      
      <SingleMemberTeam 
        title="2nd Sales Team" 
        member={secondHighestTeam} 
        isSalesCompleted={teamResultData?.is_line_02_sales_completed}
      />
      
      <TeamTable 
        title="Others Sales Team" 
        members={otherTeam} 
        serialNumber={serialNumber}
        totalSales={teamResultData?.other_team_total_sales}
        totalMembers={otherTotalMembers}
        isSalesCompleted={teamResultData?.is_line_03_sales_completed}
      />
    </>
  );
};

export default MyTeamList;