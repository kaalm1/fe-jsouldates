export function navTo(page){
  return (dispatch) => {dispatch({type: page})}
}
