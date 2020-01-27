var date = new Date();
        var obj = {
                    hour0: '',
                    hour1: '',
                    hour2: '',
                    hour3: '',
                    hour4: '',
                    hour5: '',
                    hour6: '',
                    hour7: '',
                    hour8: '',
                };
        
        if(localStorage.getItem('obj')){
            obj = JSON.parse(localStorage.getItem('obj'));
        }
        $("#currentDay").html("<p>" + moment(date).format('dddd, MMMM Do') + "</p>");
        var startTime = (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) +" 09:00:00").toString(); 
        var endTime = (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) +" 18:00:00").toString(); 
        var i =0;
        for(var m = moment(startTime);  m.isBefore(endTime); m.add(1, 'hours')){
            var objId = "hour"+ (i++).toString();
            if((moment(m).isAfter(moment(), 'hour')) == true){
                $("#mainContainer").append("<div class='row' id='hour"+ i ++ +"'style='margin-top: -1px'><div class='col-md-1' style='border-top: 1px solid #000; border-bottom: 1px solid #000;'><p>" + m.format('h a') + "</p></div><div class='col-md-10 future' style='border: 1px solid #000; padding: 0;'><textarea style='border: 0; width:100%; height: 100%;'></textarea></div><div class='col-md-1 saveBtn'><i class='fas fa-save'></i></div></div>");
            }
            else if((moment(m).isBefore(moment(), 'hour')) == true){
                $("#mainContainer").append("<div class='row' id='hour"+ i ++ +"'style='margin-top: -1px'><div class='col-md-1' style='border-top: 1px solid #000; border-bottom: 1px solid #000;'><p>" + m.format('h a') + "</p></div><div class='col-md-10 past' style='border: 1px solid #000; padding: 0;'><textarea style='border: 0; width:100%; height: 100%;'></textarea></div><div class='col-md-1 saveBtn'><i class='fas fa-save'></i></div></div>");
            }
            else if((moment(m).isSame(moment(), 'hour')) == true){
                $("#mainContainer").append("<div class='row' id='hour"+ i ++ +"'style='margin-top: -1px'><div class='col-md-1' style='border-top: 1px solid #000; border-bottom: 1px solid #000;'><p>" + m.format('h a') + "</p></div><div class='col-md-10 present' style='border: 1px solid #000; padding: 0;'><textarea style='border: 0; width:100%; height: 100%;'></textarea></div><div class='col-md-1 saveBtn'><i class='fas fa-save'></i></div></div>");
            }
        }
        $('.saveBtn').on('click', function(){
            var textVal = $(this).prev().find('textarea').val();
            var elIndex = $('.saveBtn').index(this);
            var objItem = "hour"+elIndex.toString();
            obj[objItem] = textVal;
            localStorage.setItem('obj', JSON.stringify(obj));
            var retrievedObject = localStorage.getItem('obj');
            console.log('retrievedObject: ', JSON.parse(retrievedObject));
            console.log(textVal);
            console.log(elIndex);
            console.log(objItem);
            console.log(obj);
        });

        $.each($('textarea'), function( index, value ) {
            var item = ('hour' + index).toString();
            $(this).val(obj[item]);
        });