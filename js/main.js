$(document).ready(function()
	{
		$('.form-control').keydown(function(event)
		{
				if (event.keycode == 13)
				{
					getSuggestions();
				}
		});
		$('#submit').click(getSuggestions);
	});
	
function render_list(list)
{
   	var listLength = list.length;
   	var prettyStr = "";
   	if (listLength>0){
   		for (var i = 0; i<listLength; i++){
   	 		prettyStr += "<span onclick=\"getToChatroom('"+list[i][2]+"',\'"+list[i][0]+"\');\"> ";
   			prettyStr += list[i][0];
   			prettyStr += " - ";
   			prettyStr += parseFloat(list[i][1]).toFixed(2);
   			prettyStr += "</span>";
   			prettyStr += "\n";
   	}
   	}
   	return prettyStr;
}

function getToChatroom(uid,title)
{
	$.getJSON(
		$SCRIPT_ROOT + '/_add_user_to_chatroom',
		{
		 username: document.getElementById('nameuser').value,
		 uid: uid,
		 user_ip: myip
		},
		function(data){window.location.href = data.result;}
	);
};
  
function getSuggestions() 
{
  $.getJSON($SCRIPT_ROOT + '/_get_suggestions_',
  {
	input_text: $('#concept_text').val
  }, 
  function(data) 
  {
	  $('#topicList').innerHTML = render_list(data.result);
  });
}


